using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Storage;
using Microsoft.Azure.Storage.Blob;
using Microsoft.Extensions.Options;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.Initiative;
using PTT_GC_API.Models.LessonLearned;

namespace PTT_GC_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LessonLearnController : ControllerBase
    {
        private readonly ILessonLearnedRepository _lessonLearnedRepository;
        private readonly IMapper _mapper;
        private readonly InitiativeInterface _initiativeRepository;
        private readonly IOptions<BlobConfig> _blobConfig;

        public LessonLearnController(ILessonLearnedRepository lessonLearnedRepository, IMapper mapper, IOptions<BlobConfig> blobConfig, InitiativeInterface initiativeRepository)
        {
            _lessonLearnedRepository = lessonLearnedRepository;
            _mapper = mapper;
            _initiativeRepository = initiativeRepository;
            _blobConfig = blobConfig;
        }

        [HttpGet("{initiativeId}")]
        public async Task<IActionResult> GetLessonLearnByInitiativeId(int initiativeId)
        {
            var lessonLearnData = await _lessonLearnedRepository.GetLessonLearned(initiativeId);
            return Ok(lessonLearnData);
        }

        [HttpPost("{initiativeId}")]
        public async Task<IActionResult> CreateLessonLearn([FromBody] List<LessonsLearned> data, int initiativeId)
        {
            var response = await _lessonLearnedRepository.InsertLessonLearned(data, initiativeId);
            return Ok(response);
        }

        [HttpPost("CreateLessonLearn/{initiativeId}")]
        public async Task<IActionResult> CreateLessonLearnById([FromBody] LessonsLearned data, int initiativeId)
        {
            var response = await _lessonLearnedRepository.InsertLessonLearnedById(data, initiativeId);
            return Ok(response);
        }

        [HttpPut("UpdateLessonLearn/{initiativeId}")]
        public async Task<IActionResult> UpdateLessonLearnById([FromBody] LessonsLearned lessonLearnUpdate, int initiativeId)
        {
            //var lessonLearnData = await _lessonLearnedRepository.GetLessonLearnedById(lessonLearnUpdate.Id);
            try
            {
                //_mapper.Map(lessonLearnUpdate, lessonLearnData);
                var lessonLearn = _mapper.Map<LessonsLearned>(lessonLearnUpdate);
                _lessonLearnedRepository.Update(lessonLearn);
                await _lessonLearnedRepository.Save();
                //
                return Ok(lessonLearnUpdate);
            }
            catch (Exception ex){
                return Ok(0);
            }
        }

        [HttpDelete("DeleteLessonLearn/{initiativeId}/{lessonLearnId}")]
        public async Task<IActionResult> DeleteLessonLearn(int initiativeId, int lessonLearnId)
        {
            AttechmentCategory attechmentCategory = new AttechmentCategory()
            {
                CategoryId = lessonLearnId,
                CategoryType = "lessonLearn"
            };
            var response = await _lessonLearnedRepository.DeleteOneById(lessonLearnId);
            if (!response)
            {
                Ok(response);
            }
            var lessonlearnfiles = await _initiativeRepository.GetCategoryAttachment(initiativeId, attechmentCategory);

            if (lessonlearnfiles.Count <= 0)
            {
                return Ok(response);
            }

            foreach (var lessonlearnfile in lessonlearnfiles)
            {
                var attachment = await _initiativeRepository.GetAttachment(lessonlearnfile.Id);
                _initiativeRepository.Delete(attachment);
                await _initiativeRepository.Save();
                var initiativesData = await _initiativeRepository.GetInitiative(attachment.InitiativeId);
                var containerCode = _mapper.Map<InitiativeGeneral>(initiativesData).InitiativeCode.ToLower().ToString();

                await InitaitiveCodeToContainerBlob(containerCode);

                //if (containerCode.Substring(6, 1) == "/")
                //{
                //    containerCode = containerCode.Substring(0, 6) + "-" + containerCode.Substring(7, 4);
                //}
                try
                {
                    if (CloudStorageAccount.TryParse(_blobConfig.Value.StorageConnection, out CloudStorageAccount storageAccount))
                    {
                        CloudBlobClient BlobClient = storageAccount.CreateCloudBlobClient();
                        CloudBlobContainer container = BlobClient.GetContainerReference(_blobConfig.Value.PrefixContainer + containerCode);
                        if (await container.ExistsAsync())
                        {
                            CloudBlob file = container.GetBlobReference(attachment.FileName);  //File Name

                            if (await file.ExistsAsync())
                            {
                                await file.DeleteAsync();
                            }
                        }
                    }
                }
                catch { }
            }
            return Ok(response);
        }

        public async Task<string> InitaitiveCodeToContainerBlob(string initiativeCode)
        {
            initiativeCode = initiativeCode?.ToString()?.ToLower()?.Replace("/", "-");

            return await Task.FromResult(initiativeCode);
        }


    }


}