import { Session } from 'meteor/session';
import { Template } from 'meteor/templating';
import Tokens from '/imports/api/tokens.js';
import Auctions from '/imports/api/auctions.js';

Template.registerHelper('isConnected', () => Session.get('isConnected'));

Template.registerHelper('fromWei', (s) => web3.fromWei(s));

Template.registerHelper('toWei', (s) => web3.toWei(s));

Template.registerHelper('formatBalance', (wei) => {
  const format = '0,0.00[000]';
  return numeral(wei).format(format);
});

Template.registerHelper('json', (a) => {
  try {
    return JSON.stringify(a);
  } catch (e) {
    return a;
  }
});

Template.registerHelper('ETHBalance', () => {
  const balance = Session.get('ETHBalance');
  return balance;
});

Template.registerHelper('ETHToken', () => {
  const token = Tokens.findOne({ name: 'ETH' });
  return token;
});

Template.registerHelper('MKRToken', () => {
  const token = Tokens.findOne({ name: 'MKR' });
  return token;
});

Template.registerHelper('auctionNotFound', () => {
  const auction = Auctions.findAuction();
  return auction === undefined || auction.creator === '0x0000000000000000000000000000000000000000'
  || auction.creator === '0x';
});

Template.registerHelper('etherscanHref', () => {
  const network = Session.get('network');
  /* eslint-disable prefer-template */
  return 'https://' + (network === 'morden' ? 'testnet.' : '') + 'etherscan.io/address/';
  /* eslint-enable prefer-template */
});

Template.registerHelper('contractExists', () => {
  const network = Session.get('network');
  const isConnected = Session.get('isConnected');
  const exists = Session.get('contractExists');
  return network !== false && isConnected === true && exists === true;
});
