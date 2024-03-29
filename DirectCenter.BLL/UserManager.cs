﻿#region Imports

using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;

using DirectCenter.IBLL;
using DirectCenter.IDAL;
using DirectCenter.Model;

#endregion


namespace DirectCenter.BLL
{
    public class UserManager:IUserManager
    {
        #region Properties

        public IUserDao UserDao { get; set; }

        #endregion

        /// <summary>
        /// 创建一个用户(返回包含默认值)
        /// </summary>
        /// <returns></returns>
        public User NewUser()
        {
            var user = new User();

            //可以采用系统配置
            user.CreateTime = DateTime.Now;

            user.ValidFrom = DateTime.Now;
            user.ValidTo = Convert.ToDateTime("2999-12-31");
            return user;
        }

        /// <summary>
        /// 保存用户
        /// </summary>
        /// <param name="user">用户实体</param>
        /// <returns></returns>
        public User  SaveUser(User user)
        {
            Validate(user);
            if (GetUser(user.UserID) != null)
                throw new  Exception("已经存在的用户");
            return  UserDao.Save(user);
        }

        /// <summary>
        /// 获取用户
        /// </summary>
        /// <param name="userId">用户ID</param>
        /// <returns></returns>
        public User GetUser(string userId)
        {
            return UserDao.FindById(userId);
        }

        /// <summary>
        /// 删除用户
        /// </summary>
        /// <param name="userId">用户ID</param>
        /// <returns></returns>
        public void   DeleteUser(string userId)
        {
            var user = GetUser(userId);
            UserDao.Delete(user);
        }

        /// <summary>
        /// 更新用户
        /// </summary>
        /// <param name="user">用户实体</param>
        /// <returns></returns>
        public User  UpdateUser(User user)
        {
            return UserDao.SaveOrUpdate(user);
        }



        /// <summary>
        /// 获取所有的用户
        /// </summary>
        /// <returns></returns>
        public  IList GetAll()
        {
            return UserDao.FindAll();
        }

        private void Validate(User  user)
        {
            //TODO throw exception on error.
        }
    }
}
