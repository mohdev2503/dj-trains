// ProductForm.js
import React, {useEffect, useState} from 'react';
import axios from 'axios';

const ProductForm = () => {
    const [fields, setFields] = useState({});

    useEffect(() => {
        const fetchFields = async () => {
            const response = await axios.get('http://127.0.0.1:8000/api/product-fields/'); // Adjust your endpoint accordingly
            console.log(response);
            setFields(response.data);
        };
        fetchFields();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        // Submit the data to your API
        await axios.post('http://127.0.0.1:8000/api/products/', data);
    };

    return (
        <form onSubmit={handleSubmit}>
            {Object.keys(fields).map((fieldName) => {
                const field = fields[fieldName];
                switch (field.type) {
                    case 'CharField':
                        return (
                            <div key={fieldName}>
                                <label>{fieldName}</label>
                                <input type="text" name={fieldName} maxLength={field.max_length}/>
                            </div>
                        );
                    case 'DecimalField':
                        return (
                            <div key={fieldName}>
                                <label>{fieldName}</label>
                                <input type="number" step="0.01" name={fieldName}/>
                            </div>
                        );
                    case 'TextField':
                        return (
                            <div key={fieldName}>
                                <label>{fieldName}</label>
                                <textarea name={fieldName}/>
                            </div>
                        );
                    case 'IntegerField':
                        return (
                            <div key={fieldName}>
                                <label>{fieldName}</label>
                                <input type="number" name={fieldName}/>
                            </div>
                        );
                    case 'BooleanField':
                        return (
                            <div key={fieldName}>
                                <label>
                                    <input type="checkbox" name={fieldName}/>
                                    {fieldName}
                                </label>
                            </div>
                        );
                    default:
                        return null;
                }
            })}
            <button type="submit">Submit</button>
        </form>
    );
};

export default ProductForm;
