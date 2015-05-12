using System.Collections;
using System.Collections.Generic;
using DirectCenter.Model;

namespace DirectCenter.IDAL
{
    public interface IUserDao
    {
        User FindById(string userId);
        void Delete(User user);
        User Save(User user);
        User SaveOrUpdate(User user);
        IList  FindAll();
    }
}
