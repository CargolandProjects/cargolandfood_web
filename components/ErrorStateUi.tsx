const ErrorStateUi = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-col gap-6 justify-center items-center">
      <svg
        width="96"
        height="96"
        viewBox="0 0 96 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="8" y="8" width="80" height="80" rx="40" fill="#F25C05" />
        <rect
          x="4"
          y="4"
          width="88"
          height="88"
          rx="44"
          stroke="#F25C05"
          stroke-opacity="0.2"
          stroke-width="8"
        />
        <path
          d="M47.5 66C37.5586 66 29.5 57.9414 29.5 48C29.5 38.0586 37.5586 30 47.5 30C57.4414 30 65.5 38.0586 65.5 48C65.5 57.9414 57.4414 66 47.5 66ZM47.5 62.4C51.3191 62.4 54.9818 60.8829 57.6823 58.1823C60.3829 55.4818 61.9 51.8191 61.9 48C61.9 44.1809 60.3829 40.5182 57.6823 37.8177C54.9818 35.1171 51.3191 33.6 47.5 33.6C43.6809 33.6 40.0182 35.1171 37.3177 37.8177C34.6171 40.5182 33.1 44.1809 33.1 48C33.1 51.8191 34.6171 55.4818 37.3177 58.1823C40.0182 60.8829 43.6809 62.4 47.5 62.4V62.4ZM45.7 53.4H49.3V57H45.7V53.4ZM45.7 39H49.3V49.8H45.7V39Z"
          fill="white"
        />
      </svg>

      <h3 className="text-lg leading-6 text-neutral-500">{message}</h3>
    </div>
  );
};

export default ErrorStateUi;
