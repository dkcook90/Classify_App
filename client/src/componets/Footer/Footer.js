import React from "react";
import "./Footer.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import GitHubLogo from "../../img/githubLogoWhite.png";
import { Container } from "react-bootstrap";
function Footer() {
	return (
		<Container>
			<Row className="justify-content-start">
				<Col>
					<p>This project was created by the Classify Team:</p>
				</Col>
				<Col>
					<p>Find the Classify repo @ GitHub.</p>
				</Col>
			</Row>
			<Row className="justify-content-start my-2">
				<Col>
					<p>
						<a
							href="https://github.com/eeoerkeedu"
							className="teamLinks"
							target="_blank"
							rel="noopener noreferrer"
						>
							Erik Oerke
						</a>
						<br />
						<a
							href="https://github.com/confusedicarus"
							className="teamLinks"
							target="_blank"
							rel="noopener noreferrer"
						>
							Rick Morrissette
						</a>
						<br />
						<a
							href="https://github.com/dkcook90"
							className="teamLinks"
							target="_blank"
							rel="noopener noreferrer"
						>
							Donald Cook
						</a>
						<br />
						<a
							href="https://github.com/Michael-Bee"
							className="teamLinks"
							target="_blank"
							rel="noopener noreferrer"
						>
							Michael Bee
						</a>
						<br />
					</p>
				</Col>
				<Col>
					<a href="https://github.com/dkcook90/Classify_App" target="_blank">
						<img
							alt=""
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
					<p>
						<span className="copyright">
							© Copyright 2022 Classify. All Rights Reserved.
						</span>
					</p>
				</Col>
			</Row>
		</Container>
	);
}
export default Footer;
