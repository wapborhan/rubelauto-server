import { Dropdown } from "primereact/dropdown";

const SearchAbleDropDown = (props) => {
  const {
    state,
    setState,
    data,
    placeHolder,
    config = {},
    disable,
    requir,
  } = props;

  const enOptionTemplate = (option) => {
    return (
      <div className="flex align-items-center">
        <div>{option[config.optLabel]}</div>
      </div>
    );
  };

  const selectedENTemplate = (option, props) => {
    if (option) {
      return (
        <div className="flex align-items-center">
          <div>{option[config.optLabel]}</div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };

  return (
    <Dropdown
      value={state}
      onChange={(e) => setState(e.value)}
      options={data}
      optionLabel={config.optLabel}
      placeholder={config.placeHolder}
      filter
      valueTemplate={selectedENTemplate}
      itemTemplate={enOptionTemplate}
      className="w-full md:w-14rem border-2"
      disabled={disable}
      required={requir}
    />
  );
};

export default SearchAbleDropDown;
