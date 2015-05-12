using System;
using System.Collections;
using System.Collections.Generic;

using System.Web.Mvc;
using DirectCenter.DTO;
using DirectCenter.Model;
using DirectCenter.DTO.Mappers;

namespace DirectCenter.Controllers
{
    public class DepartmentController : BaseController
    {
        [OutputCache(Duration = 60, VaryByParam = "*")]
        public ActionResult GetAll()
        {
            IList list = ManagerFactory.DepartmentManager.GetAll();
            IList<DepartmentDTO> result = new List<DepartmentDTO>();
            foreach (Department o in list)
            {
                result.Add(DepartmentDTOMapper.MapToDTO(o));
            }
            return this.Json(result);
        }
    }
}