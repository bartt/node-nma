'use strict';

var Lab = require('lab');

var Lab = require('lab');
var lab = exports.lab = Lab.script();
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var describe = lab.describe;
var it = lab.it;
var afterEach = lab.afterEach;
var assert = chai.assert;

var Hoek = require('hoek');
var sinon = require('sinon');

var request = require('request');
var nma = require('../lib/nma');

var defaultOptions = {
  apikey: '02cfc1a5f4e567929c31c13953e1adef247118562f148f7a',
  application: 'node-nma tests',
  event: 'A Test Event',
  description: 'A test description...',
  priority: 0,
  url: 'http://www.github.com/',
  'content-type': 'text/plain'
};

var responseSuccess = '<?xml version="1.0" encoding="UTF-8"?><nma><success code="200" remaining="798" resettimer="58"/></nma>';
var responseErrorKey = '<?xml version="1.0" encoding="UTF-8"?><nma><error code="401" >None of the API keys provided were valid.</error></nma>';
var responseErrorUnknown = '<?xml version="1.0" encoding="UTF-8"?><nma><error code="5xx" >Unknown</error></nma>';

describe('nma', function () {
  afterEach(function (done) {
    request.post.restore();
    done();
  });

  it('makes a POST to the NMA "/publicapi/notify" endpoint with the passed options', function (done) {
    sinon.stub(request, 'post')
      .yields(null, { statusCode: 200 }, responseSuccess);
    var spy = sinon.spy();

    var promise = nma(defaultOptions).then(spy).then(function () {
      return assert(spy.calledWith([{ statusCode: 200 }, responseSuccess]));
    });

    assert(request.post.calledWith('https://www.notifymyandroid.com/publicapi/notify', { form: defaultOptions }));
    assert.isFulfilled(promise);

    done();
  });

  it('calls the callback with a known error', function (done) {
    var keyErrorOptions = Hoek.applyToDefaults(defaultOptions, { apikey: 'bob' });
    var spy = sinon.spy();

    sinon.stub(request, 'post')
      .yields(null, { statusCode: 200 }, responseErrorKey);

    var promise = nma(keyErrorOptions).catch(spy).then(function () {
      return assert(spy.calledWith([new Error(), { statusCode: 200 }, responseErrorKey]));
    });

    assert(request.post.calledWith('https://www.notifymyandroid.com/publicapi/notify', { form: keyErrorOptions }));
    assert.isFulfilled(promise);

    done();
  });

  it('calls the callback with an unknown error', function (done) {
    var spy = sinon.spy();

    sinon.stub(request, 'post')
      .yields(null, { statusCode: 200 }, responseErrorUnknown);

    var promise = nma(defaultOptions).catch(spy).then(function () {
      return assert(spy.calledWith([new Error(), { statusCode: 200 }, responseErrorUnknown]));
    });
    assert(request.post.calledWith('https://www.notifymyandroid.com/publicapi/notify', { form: defaultOptions }));
    assert.isFulfilled(promise);

    done();
  });

  it('calls the callback with an error from request itself', function (done) {
    var spy = sinon.spy();

    sinon.stub(request, 'post')
      .yields('mockerror', { statusCode: 200 }, '');

    var promise = nma(defaultOptions).catch(spy).then(function () {
      return assert(spy.calledWith(['mockerror', { statusCode: 200 }, '']));
    });

    assert(request.post.calledWith('https://www.notifymyandroid.com/publicapi/notify', { form: defaultOptions }));
    assert.isFulfilled(promise);

    done();
  });

  it('properly no-ops without a callback', function (done) {
    sinon.stub(request, 'post');

    nma(defaultOptions);

    assert(request.post.calledWith('https://www.notifymyandroid.com/publicapi/notify', { form: defaultOptions }));

    done();
  });
});
