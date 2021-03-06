'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var dashboardCtrlStub = {
  index: 'dashboardCtrl.index',
  show: 'dashboardCtrl.show',
  create: 'dashboardCtrl.create',
  upsert: 'dashboardCtrl.upsert',
  patch: 'dashboardCtrl.patch',
  destroy: 'dashboardCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var dashboardIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './dashboard.controller': dashboardCtrlStub
});

describe('Dashboard API Router:', function() {
  it('should return an express router instance', function() {
    expect(dashboardIndex).to.equal(routerStub);
  });

  describe('GET /api/dashboard', function() {
    it('should route to dashboard.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'dashboardCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/dashboard/:id', function() {
    it('should route to dashboard.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'dashboardCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/dashboard', function() {
    it('should route to dashboard.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'dashboardCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/dashboard/:id', function() {
    it('should route to dashboard.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'dashboardCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/dashboard/:id', function() {
    it('should route to dashboard.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'dashboardCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/dashboard/:id', function() {
    it('should route to dashboard.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'dashboardCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
