import React from 'react';

const InfoForm = props => {
    const { register, handleSubmit, handleAddPlan } = props;
    return (
        <form onSubmit={handleSubmit(handleAddPlan)}>
            <h3 className="text-center my-3 text-uppercase">Add a <span className="text-info">new plan</span></h3>
            <input type="text" className="form-control mb-3" placeholder="Title" {...register('title', { required: true })} />
            <input type="text" className="form-control mb-3" placeholder="IBB Image URL" {...register('img_url', { required: true })} />
            
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Tour Days" {...register('tourDays', { required: true })} />
                <input type="text" className="form-control" placeholder="Rating" {...register('rating', { required: true })} />
                <input type="text" className="form-control" placeholder="Cost" {...register('cost', { required: true })} />
            </div>
            
            <input type="date" className="form-control mb-3" placeholder="Starting Date" {...register('starting_date', { required: true })} />
            <textarea className="form-control mb-3" placeholder="Description" rows="6" {...register('description', { required: true })} />
            
            <div>
                <input type="submit" value="Done" className="btn btn-primary" />{" "}
                <input type="reset" value="Cancel" className="btn btn-outline-secondary" />
            </div>
        </form>
    );
};

export default InfoForm;