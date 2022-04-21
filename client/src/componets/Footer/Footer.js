import React from "react";
import './Footer.css';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function Footer() {
	return (
		<footer class="footer">
			<Row class="d-flex justify-content-center">
				<Col class="col-4">
				<a href="https://github.com/dkcook90/Classify_App"><img alt=""
					src="../../public/githubLogoWhite.png"
					width="80"
					height="80"
					className="d-inline-block align-center"
					/></a>
				</Col>
				<Col class="col-8">
					<p>This project was created by the Classify Team.</p> 
					<p><a href="https://www.linkedin.com/in/erik-oerke-6a24bb8b/">Erik Oerke</a></p>
					<p><a href="https://www.linkedin.com/in/rick-morrissette-4bb362149/">Rick Morrissette</a></p>
					<p><a href="https://www.linkedin.com/in/donald-cook-4aa46813b/">Donald Cook</a></p>
					<p><a href="https://www.linkedin.com/in/michael-bee-13676a225/">Michael Bee</a></p>
					<p>Find our Classify repo @ GitHub.</p>
				</Col>
			</Row>
			<Row class="d-flex justify-content-center">	
				<p><span className="copyright">© Copyright 2022 Classify. All Rights Reserved.</span></p>
				<img
					alt=""
					src="../../public/classifyLogo.png"
					width="80"
					height="80"
					className="d-inline-block align-center"
				/>
			</Row>
		</footer>
	);
}
export default Footer;
