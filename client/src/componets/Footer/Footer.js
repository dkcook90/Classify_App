import React from "react";
import './Footer.css';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import GitHubLogo from "../../img/githubLogoWhite.png"
function Footer() {
	return (

		<footer class="footer">
			<Row className="justify-content-md-center">
				<Col>
					<p>This project was created by the Classify Team:</p>
				</Col>
				<Col>
					<p>Find the Classify repo @ GitHub.</p>
				</Col>
			</Row>
			<Row className="justify-content-md-center my-2">
				<Col>
					<p><a href="https://github.com/eeoerkeedu" className="teamLinks" target="_blank">Erik Oerke</a></p>
					<p><a href="https://github.com/confusedicarus" className="teamLinks" target="_blank">Rick Morrissette</a></p> 
					<p><a href="https://github.com/dkcook90" className="teamLinks" target="_blank">Donald Cook</a></p>
					<p><a href="https://github.com/Michael-Bee" className="teamLinks" target="_blank">Michael Bee</a></p>
				</Col>
				<Col>
					<a href="https://github.com/dkcook90/Classify_App" target="_blank"><img alt=""
						src={GitHubLogo}
						width="80"
						height="80"
						className="d-inline-block align-center"
						/>
					</a>
				</Col>
			</Row>
			<Row className="justify-content-md-center">	
				<Col>
					<p><span className="copyright">© Copyright 2022 Classify. All Rights Reserved.</span></p>
				</Col>
			</Row>
		</footer>
	);
}
export default Footer;
