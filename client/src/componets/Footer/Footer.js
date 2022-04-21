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
					<p>This project was created by the Classify Team. Find our repo @ GitHub.</p>
				</Col>
			</Row>
			<Row class="d-flex justify-content-center">
				<p>Erik Oerke, Rick Morrissette, Donald Cook, Michael Bee</p>	
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
