# **Color Wars**

This site is a fully-featured [LAMP](https://en.wikipedia.org/wiki/LAMP_(software_bundle)) website created to streamline
and modernize the week of *Color Wars* at a summer camp I work at. During this week, groups are put together into teams
where each team has a color. These teams then compete against each other in challenges throughout the day for points, and
at the end of the week, the team with the most points wins. It's always been a blast, but managing the points coming in
throughout camp was slow and manual, never mind displaying the points, which was done daily on boards on a field. So,
I decided to create a website that would solve both the adding and viewing of points for camp.

# Installation Instructions

### Prerequisites
You must have docker installed on the machine with root (sudo) access

### Instructions
1. Clone this repository to your machine
2. Obtain SSL (HTTPS) certificates
   - You must get both the key and certificate
3. Name the key file *privkey.pem* and the certificate file *fullchain.pem*, and place them in the main directory of the project (most likely color-wars-website)
4. In *compose.yaml*, replace both **[PASSWORD HERE]** instances with your own password.
5. In *ssl.conf*, replace **[SITE NAME HERE]** with your website domain name attached to the certificate
6. Run ***docker compose up*** or ***docker compose up -d*** to run in detached mode