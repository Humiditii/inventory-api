import {expect} from 'chai'
import request from 'supertest';
import db_connection from '../conn'
import dotenv from 'dotenv';

dotenv.config()

const {mocker, connect, disconnect} = db_connection

import app from '../app';

const signup = {
    businessName: 'Hameed',
    email: 'hameed@gmail.com',
    password:'hameed'
}

const connection_config = {
    port: 3333,
    database_url: process.env.DATABASE_URL
}

describe('Get all tasks', ()=> {
    it('shoduld get all routes', (done)=>{
        request(app).get('/api/tasks').then( res => {
            expect(res.body).to.be.an('array')
            expect(res.body).to.have.lengthOf(3)
            done()
        }).catch( err => {
            done(err)
        } )
    })
})

describe('Working with mongoose', ()=> {
    describe('Sign up new User', ()=>{
        before((done)=>{
            connect(connection_config).then(()=> done()).catch( err => done(err))
            // mocker(signup, 'auth')
        })

        after((done)=>{
            disconnect().then(()=> done() ).catch( err => done(err))
        })
        it('Should sign new user', (done)=> {
            request(app).post('/api/v1/auth/signup')
            .send(signup).then( (res)=> {
                const {body} = res
                expect(body).to.contain.property('message');
                done()
            }).catch( err => done(err))
        })

        it('should check if email exists', (done)=>{
            request(app).post('/api/v1/auth/signup')
            .send(signup).then ( res => {
                console.log(res)
                const {body} = res
                expect(body).to.contain.property('message')
                // expect(bod)
                done()
            }).catch( err=> done(err))
        })
    })
})