import React from 'react';
import { useHistory } from 'react-router-dom';

const InfoForm = props => {
    const history = useHistory();
    const { register, handleSubmit, onSubmit } = props;
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="text-center my-3 text-uppercase">Add a <span className="text-info">new plan</span></h3>
            <input type="text" className="form-control mb-3" placeholder="Name" {...register('name', { required: true })} />
            <input type="file" className="form-control mb-3" placeholder="Cover Image" {...register('image', { required: true })} />

            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Tour Days" {...register('tourDays', { required: true })} />
                <input type="text" className="form-control" placeholder="Price" {...register('price', { required: true })} />
            </div>

            <input type="date" className="form-control mb-3" placeholder="Starting Date" {...register('startingDate', { required: true })} />
            <textarea className="form-control mb-3" placeholder="Short Description" rows="6" {...register('shortDescription', { required: true })} />

            <div>
                <input
                    type="submit"
                    value="Done"
                    className="btn btn-primary"
                />{" "}
                <input
                    type="reset"
                    value="Cancel"
                    className="btn btn-outline-secondary"
                    onClick={() => history.goBack()}
                />
            </div>
        </form>
    );
};

export default InfoForm;