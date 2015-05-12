using System;
using System.Collections;
using System.Collections.Generic;
using NHibernate;
using Spring.Data.NHibernate.Support;

using DirectCenter.IDAL;
using DirectCenter.Model;
using Spring.Data.NHibernate;
using NHibernate.Engine;

namespace DirectCenter.DAL
{
    public class UserDao : HibernateDaoSupport, IUserDao
    {
        public User Save(User user)
        {
            HibernateTemplate.Save(user);
            return user;
        }
        public User SaveOrUpdate(User user)
        {
            HibernateTemplate.SaveOrUpdate(user);
            return user;
        }
        public void Delete(User user)
        {
            HibernateTemplate.Delete(user);
        }
        public User FindById(string userId)
        {
            return HibernateTemplate.Get(typeof(User), userId) as User;
        }
        public  IList  FindAll()
        {
            return HibernateTemplate.LoadAll(typeof (User));
        }
    }
}
