const cds = require('@sap/cds');

module.exports = (srv) => {
  const { EmployeeSet } = srv.entities;

  srv.on('CREATE', EmployeeSet, async (req) => {
    const { salaryAmount, currency } = req.data;

    if (!(salaryAmount < 50000 && currency?.code === 'USD')) {
      return req.error(301, 'EmployeeSet salary must be less than 50000 USD');
    }

    return await cds.run(
      INSERT.into(EmployeeSet).entries(req.data)
    );
  });

  srv.after('CREATE', EmployeeSet, () => {
    console.log("Create Operation Successful");
  });

  srv.before('UPDATE', EmployeeSet, async (req) => {
    const { ID, nameFirst, loginName } = req.data;

    const existing = await cds.run(
      SELECT.one.from(EmployeeSet).where({ ID })
    );

    if (!existing) return req.error(404, `EmployeeSet ${ID} not found`);

    if (!nameFirst || !loginName) {
      return req.error(400, 'Both nameFirst and loginName are required.');
    }

    if (existing.nameFirst !== nameFirst || existing.loginName !== loginName) {
      return req.error(400, 'Operation not allowed: nameFirst and loginName cannot be changed.');
    }
  });

 

  srv.before('UPDATE', EmployeeSet, async (req) => {
  const { salaryAmount, currency_code } = req.data;

  if (!(salaryAmount < 50000 && currency_code === 'USD')) {
    return req.error(301, 'EmployeeSet salary must be less than 50000 USD');
  }
});


  srv.on('UPDATE', EmployeeSet, async (req) => {
    const { ID, ...data } = req.data;

    await cds.run(
      UPDATE(EmployeeSet).set(data).where({ ID })
    );
  });

  srv.after('UPDATE', EmployeeSet, () => {
    console.log("Update Operation Successful");
  });


srv.on('DELETE', EmployeeSet, async (req) => {
  const { ID } = req.params[0];        

  const existing = await SELECT.one.from(EmployeeSet).where({ ID });
  if (!existing) return req.error(404, `EmployeeSet ${ID} not found`);

  if (existing.nameFirst && existing.nameFirst.startsWith('S')) {
    return req.error(302, `EmployeeSet ${ID} operation not allowed for names starting with S`);
  }

  await DELETE.from(EmployeeSet).where({ ID });
});
}
