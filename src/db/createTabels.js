

const {sequelize}=require('./sequelize')

//require('./dbModels')

sequelize.sync({
  force: true
});

// select * from information_schema.columns
// where table_schema = 'db name'
// order by table_name,ordinal_position;

