namespace Application.API.Exceptions
{
    public class BadApplicationStatusException : Exception
    {
        public BadApplicationStatusException(string? message) : base(message)
        {

        }
    }
}
