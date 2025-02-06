import { FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initialMainSliceInterface, setCategory } from "../redux-toolkit/mainSlice";
import "./../../css/SearchForm.css";
import { redirect } from "react-router-dom";

interface searchFormProps {
  mobile?: boolean
}


export default function SearchForm({ mobile }: searchFormProps) {
  const searchState = useSelector((state: {main: initialMainSliceInterface}) => state.main.searchState);
  //const [searchOpen, steSearchOpen] = useState(false)
  const dispatch = useDispatch();

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();

    const form = ev.target as HTMLFormElement;
    const searchElement = form.elements.namedItem("search") as HTMLInputElement | null;

    if (searchElement) {
      const settingCategory = searchElement.value;
      dispatch(setCategory({ settingCategory }));
      searchElement.value = "";
      return redirect("/shoes-app/catalog");
    }
  };

  const mobileFormContainer = <form data-id="search-form" onSubmit={onSubmit} className="mobile-form">
    <input name="search" className="mobile-form-input" placeholder="Поиск" />

    <span className="input-group-btn">
      <button type="submit" className="btn-lg"></button>
    </span>

    
  </form>


  return (
    <>
      {
        mobile ? mobileFormContainer : <form
        data-id="search-form"
        className={`header-controls-search-form form-inline 
          ${
          searchState ? "invisible" : ""
          }`}
        onSubmit={onSubmit}
      >
        <input name="search" className="form-control" placeholder="Поиск" />
      
      </form>
      }

      {/* <form data-id="search-form" class="drawer-form">
        <input name="search" class="drawer-form-input" placeholder="Поиск">
      </form> */}
    </>
  );
}
