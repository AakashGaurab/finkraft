module.exports = (sequelize,DataTypes)=>{
    const files = sequelize.define("files",{
       
       userid:{type:DataTypes.INTEGER,refrence:{model:'users',key:'id'}},
       filename:{type:DataTypes.STRING,allowNull:false},
       uploadDate:{type:DataTypes.STRING,allowNull:false}

    })

    return files;
}