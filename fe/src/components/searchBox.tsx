import './searchBox.scss';

interface ISearchBox {
    value: string,
    onChange: React.Dispatch<React.SetStateAction<string>>,
    onSubmit: () => void
}

const SearchBox: React.FC<ISearchBox> = ({value, onChange}: ISearchBox) => {
    
    return (

        <div className="searchBox-Container">
            <input 
                className="searchBox-Input"
                type="text"
                value={value}
                placeholder="Search for a user..."
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
            /> 
            <button 
                className="searchBox-Button"
            >
                Go!
            </button>
        </div>
    )
}
export default SearchBox;