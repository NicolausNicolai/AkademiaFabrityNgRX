namespace Application.API.Domain
{
    public class Application
    {
        public int Id { get; set; }
        public string Number { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string ApplicantsName { get; set; }
        public DateTime CreatedDate { get; set; }
        public ApplicationStatus ApplicationStatus { get; set; }
        public DateTime CompletionDate { get; set; }
    }
}
