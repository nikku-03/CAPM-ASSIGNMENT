namespace ust.nikita.pandi.reuse;

using { Currency } from '@sap/cds/common';

type Gender : String(1) enum {
    male        = 'M';
    female      = 'F';
    undisclosed = 'U';
};


type PhoneNumber : String(30) @assert.match :
    '^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$';

type Email : String(255) @assert.match :
    '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$';


type AmountT : Decimal(10,2) @(
    Semantics.amount.currencyCode : 'CURRENCY_CODE',
    sap.unit                      : 'CURRENCY_CODE'
);

aspect Amount {
    CURRENCY      : Currency;
    GROSS_AMOUNT  : AmountT @(title : '{i18n>GrossAmount}');
    NET_AMOUNT    : AmountT @(title : '{i18n>NetAmount}');
    TAX_AMOUNT    : AmountT @(title : '{i18n>TaxAmount}');
}
