const SubmitButton = ({ name }) => {
  return (
    <input
      type="submit"
      value={name}
      className="rounded-lg font-h2 mt-4 border-2-[#888] bg-[#198754] w-full p-3 font-bold text-[18px] text-white cursor-pointer"
    />
  );
};

export default SubmitButton;
