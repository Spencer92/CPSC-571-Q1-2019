async function main() {
  const port = process.env.PORT || 3000;
  db = await sqlite.open('./db.sqlite', { cached: true, Promise }).then(db => db.migrate());
  app.listen(port);

  // This query activates foreign constraints
  await db.run(SQL`PRAGMA foreign_keys = ON`);

  console.log(`Listening on port ${port}: http://localhost:${port}`);
}
