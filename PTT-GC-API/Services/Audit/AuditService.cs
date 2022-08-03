using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.Audit;

namespace PTT_GC_API.Services.Audit
{
	public interface IAuditService
	{
		public int CallFullLog(LogParams logParams);
	}
	public class AuditService : IAuditService
	{
		private AuditInterface _auditInterface;

		public AuditService(AuditInterface auditInterface)
		{
			_auditInterface = auditInterface;
		}

		public int CallFullLog(LogParams logParams)
		{

			return 1;
		}

	}
}
