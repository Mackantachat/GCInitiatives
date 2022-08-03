using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Linq;
using System.Xml.Serialization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PTT_GC_API.Data;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Data.Repository;
using PTT_GC_API.Models.SOAPservice;

namespace PTT_GC_API.Controllers
{
    public class SoapServiceController : SoapServiceInterface
    {
        private readonly DataContext _context;

        public SoapServiceController(DataContext context)
        {
            _context = context;
        }
        
        public string GetInitiativeStatus(string initiativeCode)
        {
            try
            {
                var initiative = _context.Initiatives.Where(i => i.InitiativeCode == initiativeCode && (i.HistoryFlag == null || i.HistoryFlag == 0)).FirstOrDefault();
                if (initiative == null) return ("Initiative code not found.");
                if (initiative.Status == null) return ("Initiative status not found.");
                return initiative.Status;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void XmlMethod(XElement xml)
        {
            Console.WriteLine(xml.ToString());
        }

        public InitiativeStatus InitiativeStatusModel(InitiativeStatus model)
        {
            return model;
        }
    }
}