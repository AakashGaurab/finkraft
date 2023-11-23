module.exports = (sequelize,DataTypes)=>{
    const blogs = sequelize.define("blogs",{
       
       userid:{type:DataTypes.INTEGER,refrence:{model:'users',key:'id'}},
       filename:{type:DataTypes.STRING,allowNull:false},
       uploadDate:{type:DataTypes.STRING,allowNull:false}

    })

    return blogs;
}