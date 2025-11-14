namespace ust.nikita.pandi.reuse;

using { cuid, Currency } from '@sap/cds/common';
using ust.nikita.pandi.reuse as Common from './common';


entity Employee : cuid {

    nameFirst       : String(40);
    nameMiddle      : String(40);
    nameLast        : String(40);
    nameInitials    : String(40);

    gender          : Common.Gender;
    language        : String(1);

    phoneNumber     : Common.PhoneNumber;
    email           : Common.Email;

    loginName       : String(12);

    currency        : Currency;
    salaryAmount    : Decimal(10,2);

    accountNumber   : String(16);
    bankId          : String(8);
    bankName        : String(64);
}
