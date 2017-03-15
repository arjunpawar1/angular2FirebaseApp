import { PropertyListingsPage } from './app.po';

describe('property-listings App', function() {
  let page: PropertyListingsPage;

  beforeEach(() => {
    page = new PropertyListingsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
