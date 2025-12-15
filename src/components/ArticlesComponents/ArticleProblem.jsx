import React from 'react';

const ArticleProblem = ({ data }) => {
    console.log('ArticleProblem - received data:', data);
    
    return (
        <div className="single-case-screen2 gray-background section is_view target_section" id="problem">
            <div className="wrap view hidden-block">
                <div className="flex-row">
                    <div className="w50">
                        <div className="section-subheading">{data.SectionTitle || "Project"}</div>
                        <div className="section-title">
                            {data.MainTitle || "Problems & solutions"}
                        </div>
                    </div>
                    <div className="w50">
                    </div>
                </div>
                <div className="flex-row how_to_solve ordinary-text">
                    <div className="w50">
                        <div className="section-title small">
                            {data.ProblemsTitle || "Problem"}
                        </div>
                        {data.Problems && data.Problems.length > 0 && data.Problems.map((problem, index) => (
                            <div className="stage-line" key={`problem-${index}`}>
                                <span>{problem.number}</span>
                                <p>{problem.text}</p>
                            </div>
                        ))}
                    </div>
                    <div className="w50">
                        <div className="section-title small">
                            {data.SolutionsTitle || "Solution"}
                        </div>
                        {data.Solutions && data.Solutions.length > 0 && data.Solutions.map((solution, index) => (
                            <div className="stage-line" key={`solution-${index}`}>
                                <span>{solution.number}</span>
                                <p>{solution.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleProblem;