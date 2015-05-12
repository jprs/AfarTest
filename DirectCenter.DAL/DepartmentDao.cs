using System.Collections;
using Spring.Data.NHibernate.Support;


using DirectCenter.IDAL;
using DirectCenter.Model;
 
namespace DirectCenter.DAL
{
    public class DepartmentDao : HibernateDaoSupport,IDepartmentDao
    {

        public Department Save(Department department)
        {
            HibernateTemplate.Save(department);
            return department;
        }

        public Department SaveOrUpdate(Department department)
        {
            HibernateTemplate.SaveOrUpdate(department);
            return department;
        }

        public void Delete(Department department)
        {
            HibernateTemplate.Delete(department);
        }

        public Department FindById(string departmentId)
        {
            return HibernateTemplate.Get(typeof(Department), departmentId) as Department;
        }

        public IList FindAll()
        {
            return HibernateTemplate.LoadAll(typeof (Department));
        }
    }
}
