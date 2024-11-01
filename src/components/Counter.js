import React from 'react';

function Counter() {
    const [count, setCount] = useState(0);
    const [showTitle,setShowTitle] = useState(true);
    useEffect(() => {
        document.title = showTitle ? `Count: ${count}` : 'My App';
    }, [showTitle]);
    return <div>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <button onClick={() => setShowTitle(!showTitle)}>Toggle Title</button>
        <p>Count: {count}</p>
    </div>;
}

export default Counter;
