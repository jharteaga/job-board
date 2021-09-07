/**
 * @swagger
 * components:
 *   schemas:
 *    Employer:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - role
 *         - company
 *       properties:
 *         name:
 *           type: string
 *           description: User's name
 *         email:
 *           type: string
 *           format: email
 *           description: User's email
 *         password:
 *           type: string
 *           description: User's password login
 *         role:
 *           type: string
 *           description: User's role [employer]
 *         socialMedia:
 *           type: object
 *           description: User's social media (Linkedin, Twitter, etc.)
 *         company:
 *           type: object
 *           description: User's company information
 *           properties:
 *             name:
 *              type: string
 *              description: Company's name
 *             website:
 *               type: string
 *               description: Company's website URL
 *       example:
 *         name: John Doe
 *         email: john.doe@test.com
 *         password: test1234
 *         role: employee
 *         socialMedia: { "linkedin": "http://linkedin.com" }
 *         company: { "name": "company xyz", "website": "http://company-xyz.com" }
 *    Employee:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - role
 *       properties:
 *         name:
 *           type: string
 *           description: User's name
 *         email:
 *           type: string
 *           format: email
 *           description: User's email
 *         password:
 *           type: string
 *           description: User's password login
 *         role:
 *           type: string
 *           description: User's role [employee]
 *         socialMedia:
 *           type: object
 *           description: User's social media (Linkedin, Twitter, etc.)
 *         portfolio:
 *           type: string
 *           description: User's portfolio link
 *       example:
 *         name: John Doe
 *         email: john.doe@test.com
 *         password: test1234
 *         role: employee
 *         socialMedia: { "linkedin": "http://linkedin.com"}
 *         portfolio: http://portfolio.com
 *    Response:
 *      type: object
 *      properties:
 *        meta:
 *          type: object
 *          description: meta information
 *          properties:
 *            jwt:
 *              type: string
 *              description: JWT token
 *        data:
 *          type: object
 *          description: response data according to request
 *        errors:
 *          type: object
 *          description: error occurs during the request
 *    Login:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *           type: string
 *           format: email
 *           description: User's email
 *        password:
 *           type: string
 *           description: User's password login
 *      example:
 *         email: john.doe@test.com
 *         password: test1234
 */

/**
 * @swagger
 * tags:
 *    name: Auth
 *    description: Auth REST API methods
 */

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: The user was successfully authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response'
 *       400:
 *         description: Bad request
 *       401:
 *         description: User Not Authorized
 *       404:
 *         description: User Not found
 *       409:
 *         description: User already exists
 *       415:
 *         description: Unsopported media type (application/json required)
 *       500:
 *         description: Something went wrong
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: User registration
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response'
 *       400:
 *         description: Bad request
 *       401:
 *         description: User Not Authorized
 *       404:
 *         description: User Not found
 *       409:
 *         description: User already exists
 *       415:
 *         description: Unsopported media type (application/json required)
 *       500:
 *         description: Something went wrong
 */
