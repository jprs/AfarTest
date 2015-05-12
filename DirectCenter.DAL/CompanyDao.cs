using System.Collections;
using Spring.Data.NHibernate.Support;


using DirectCenter.IDAL;
using DirectCenter.Model;


namespace DirectCenter.DAL
{
    public class CompanyDao : HibernateDaoSupport,ICompanyDao
    {
        public Company Save(Company company)
        {
            HibernateTemplate.Save(company);
            return company;
        }

        public Company SaveOrUpdate(Company company)
        {
            HibernateTemplate.SaveOrUpdate(company);
            return company;
        }

        public void Delete(Company company)
        {
            HibernateTemplate.Delete(company);
        }

        public Company FindById(string companyId)
        {
            return HibernateTemplate.Get(typeof(Company), companyId) as Company;
        }

    }
}
