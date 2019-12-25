console.log("app is running");
const app ={
    title: 'Indecision App',
    subtitle: 'Put your ideas',
    options: ['One', 'Two']
};
const onSubmitForm =(e) =>{
    e.preventDefault();
    const option = e.target.elements.option.value;
    if(option){
        app.options.push(option);
        e.target.elements.option.value='';
        rerender();
    }
};
const wipe = () =>{
    app.options=[];
    rerender();
}
const rerender = () =>{
    const template = (
        <div>
            <h1>{app.title}</h1>
            {app.subtitle && <p>{app.subtitle}</p>}
            <p>{app.options.length >0 ? 'options' : 'no options'}</p>
            <p>{app.options.length}</p>
            <form onSubmit={onSubmitForm}>
                <input type="text" name="option" />
                <button>Submit</button>
                
            </form>
            <button onClick={wipe}>Remove ALL</button>
            <ol>
            {
                app.options.map((option)=><li key={option}>{option}</li>)
            }
            </ol>
        </div>
    );
    ReactDOM.render(template, appRoot);

}
const appRoot = document.getElementById('app');
rerender();