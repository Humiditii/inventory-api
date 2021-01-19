// const chai = require('chai');
// const chaiHttp = require('chai-http')
// const app = require('../app');

// chai.should()

// chai.use(chaiHttp)


// describe( 'Tasks Api', ()=> {
//     // testing the get route
//     describe('GET /api/tasks ', () => {
//         it('It should get all tasks', (done)=> {
//             chai.request(app).get('/api/tasks').end( (err, response) => {
//                 response.should.have.status(200);
//                 response.body.should.be.a('array');
//                 response.body.length.should.be.eq(3);
//             done()
//             })
//         })
//     })

//     // testing the post route


//     // testing the post route


//     // testing the patch route
// })


import {expect} from 'chai'
import request from 'supertest';

import app from '../app';


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