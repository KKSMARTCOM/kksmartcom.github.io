import React from 'react';

const ArticleProblem = () => {
    return (
        <div className="single-case-screen2 gray-background section is_view    target_section" id="problem">
			<div className="wrap view hidden-block">

				<div className="flex-row">
					<div className="w50">
						<div className="section-subheading">Project</div>
						<div className="section-title">
							Problems & solutions </div>
					</div>
					<div className="w50">

					</div>
				</div>
				<div className="flex-row how_to_solve ordinary-text">
					<div className="w50">
						<div className="section-title small">
							Problem </div>
						<div className="stage-line">
							<span>1</span>
							<p>The existing generators on the market have a confusing and complex interface with limited
								functionality. It isn't easy to figure out how to upload your content and generate
								collections. </p>
						</div>
						<div className="stage-line">
							<span>2</span>
							<p>While researching the market, our team discovered that there is no service that allows
								you to upload your created collection to the marketplace for sale immediately.</p>
						</div>
						<div className="stage-line">
							<span>3</span>
							<p>Most competing services only have a desktop version and a mobile adaptation. There are
								also separate applications in the Apple Store and Google Play, but they don't have a
								desktop version.</p>
						</div>
					</div>
					<div className="w50">
						<div className="section-title small">
							Solution </div>
						<div className="stage-line">
							<span>1</span>
							<p>The creation of a collection has the form of a constructor, where all actions are divided
								into logical steps. At each stage, the user understands what to do, how to return to the
								previous step, and how much more information to fill in.</p>
						</div>
						<div className="stage-line">
							<span>2</span>
							<p>On our platform, users can synchronize their accounts from marketplaces such as Opensea,
								etc., and upload entire collections and individual NFTs directly to the marketplace with
								just a few clicks.</p>
						</div>
						<div className="stage-line">
							<span>3</span>
							<p>Our service has both web and mobile applications. The user can start creating a
								collection from the web platform, then switch to the mobile application and finish the
								generation. It is possible thanks to automatic saving and synchronization between the
								desktop and mobile versions.</p>
						</div>
					</div>
				</div>


			</div>
		</div>
    );
};

export default ArticleProblem;