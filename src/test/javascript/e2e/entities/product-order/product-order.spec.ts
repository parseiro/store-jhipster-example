import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProductOrderComponentsPage, ProductOrderUpdatePage } from './product-order.page-object';

const expect = chai.expect;

describe('ProductOrder e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let productOrderComponentsPage: ProductOrderComponentsPage;
  let productOrderUpdatePage: ProductOrderUpdatePage;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ProductOrders', async () => {
    await navBarPage.goToEntity('product-order');
    productOrderComponentsPage = new ProductOrderComponentsPage();
    await browser.wait(ec.visibilityOf(productOrderComponentsPage.title), 5000);
    expect(await productOrderComponentsPage.getTitle()).to.eq('storeApp.productOrder.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(productOrderComponentsPage.entities), ec.visibilityOf(productOrderComponentsPage.noResult)),
      1000
    );
  });

  it('should load create ProductOrder page', async () => {
    await productOrderComponentsPage.clickOnCreateButton();
    productOrderUpdatePage = new ProductOrderUpdatePage();
    expect(await productOrderUpdatePage.getPageTitle()).to.eq('storeApp.productOrder.home.createOrEditLabel');
    await productOrderUpdatePage.cancel();
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
