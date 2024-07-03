import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { execSync } from 'node:child_process'
import { app } from '../src/app'
import request from 'supertest'

describe('Transactions routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(async () => {
    execSync('npm run dev:knex -- migrate:rollback --all')
    execSync('npm run dev:knex -- migrate:latest')
  })

  it('should be able to create a new transaction', async () => {
    await request(app.server)
      .post('/transactions')
      .send({
        title: 'new transaction [test]',
        amount: 1234,
        type: 'credit',
      })
      .expect(201)
  })

  it('should be able to list all transactions', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'new transaction [test]',
        amount: 1234,
        type: 'credit',
      })
    const cookies = createTransactionResponse.get('Set-Cookie')

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies!)
      .expect(200)

    expect(listTransactionsResponse.body).toEqual({
      total: expect.any(Number),
      transactions: [
        expect.objectContaining({
          id: expect.any(String),
          title: 'new transaction [test]',
          amount: 1234,
          created_at: expect.any(String),
          session_id: expect.any(String),
        }),
      ],
    })
  })

  it('should be able to get an specific transaction', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'new transaction [test]',
        amount: 1234,
        type: 'credit',
      })
    const cookies = createTransactionResponse.get('Set-Cookie')

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies!)
      .expect(200)

    const transactionId = listTransactionsResponse.body.transactions[0].id

    const getTransactionResponse = await request(app.server)
      .get(`/transactions/${transactionId}`)
      .set('Cookie', cookies!)
      .expect(200)

    expect(getTransactionResponse.body.transaction).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        title: 'new transaction [test]',
        amount: 1234,
        created_at: expect.any(String),
        session_id: expect.any(String),
      }),
    )
  })

  it('should be able to get the summary of transactions', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'credit transaction [test]',
        amount: 1234,
        type: 'credit',
      })

    const cookies = createTransactionResponse.get('Set-Cookie')

    await request(app.server)
      .post('/transactions')
      .set('Cookie', cookies!)
      .send({
        title: 'debit transaction [test]',
        amount: 234,
        type: 'debit',
      })

    const summaryResponse = await request(app.server)
      .get('/transactions/summary')
      .set('Cookie', cookies!)
      .expect(200)

    expect(summaryResponse.body.summary).toEqual({
      amount: 1234 - 234,
    })
  })
})
