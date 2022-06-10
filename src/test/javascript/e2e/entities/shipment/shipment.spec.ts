import { browser, ExpectedConditions as ec /* , protractor, promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ShipmentComponentsPage, ShipmentUpdatePage } from './shipment.page-object';

const expect = chai.expect;

describe('Shipment e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let shipmentComponentsPage: ShipmentComponentsPage;
  let shipmentUpdatePage: ShipmentUpdatePage;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Shipments', async () => {
    await navBarPage.goToEntity('shipment');
    shipmentComponentsPage = new ShipmentComponentsPage();
    await browser.wait(ec.visibilityOf(shipmentComponentsPage.title), 5000);
    expect(await shipmentComponentsPage.getTitle()).to.eq('storeApp.shipment.home.title');
    await browser.wait(ec.or(ec.visibilityOf(shipmentComponentsPage.entities), ec.visibilityOf(shipmentComponentsPage.noResult)), 1000);
  });

  it('should load create Shipment page', async () => {
    await shipmentComponentsPage.clickOnCreateButton();
    shipmentUpdatePage = new ShipmentUpdatePage();
    expect(await shipmentUpdatePage.getPageTitle()).to.eq('storeApp.shipment.home.createOrEditLabel');
    await shipmentUpdatePage.cancel();
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
