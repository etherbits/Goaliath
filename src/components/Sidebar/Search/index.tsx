type Props = React.InputHTMLAttributes<HTMLInputElement>

const Search: React.FC<Props> = (props) => {
  const { className, ...rest } = props;

  return <div className={`flex gap-4 p-2 items-center bg-transparent rounded-md outline-1 outline-neutral-400 ${className || ""} focus-within:outline`}>
    <div className={`w-5 h-5 bg-neutral-400 [mask-image:url("/assets/images/search.svg")] [mask-size:20px]`} />
    <input {...rest} type="text" className="text-neutral-400 bg-transparent outline-none" />
  </div>
}

export default Search;
