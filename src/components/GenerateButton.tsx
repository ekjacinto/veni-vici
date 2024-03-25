type GenerateButtonProps = {
  event: () => void;
};

const GenerateButton = ({ event }: GenerateButtonProps) => {
  return (
    <button
      onClick={event}
      className="w-42 h-15 text-3xl border-4 border-white"
    >
      Generate Agent
    </button>
  );
};

export default GenerateButton;
