--
-- PostgreSQL database dump
--

\restrict IqXEyt0JTQuxsNEGKedNuWCfNpmd1orhl6zRZXoqTF5p4VSuZnCvZSw4bv94hHx

-- Dumped from database version 18.0
-- Dumped by pg_dump version 18.0

-- Started on 2025-10-24 17:39:33

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 222 (class 1259 OID 16446)
-- Name: departments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.departments (
    id integer NOT NULL,
    faculty_id integer,
    dept_name text NOT NULL
);


ALTER TABLE public.departments OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16445)
-- Name: departments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.departments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.departments_id_seq OWNER TO postgres;

--
-- TOC entry 4923 (class 0 OID 0)
-- Dependencies: 221
-- Name: departments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.departments_id_seq OWNED BY public.departments.id;


--
-- TOC entry 220 (class 1259 OID 16390)
-- Name: faculties; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.faculties (
    id integer NOT NULL,
    name text NOT NULL,
    short_name text,
    established_year integer,
    website text,
    address_street text,
    address_city text,
    postal_code text,
    university text
);


ALTER TABLE public.faculties OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16389)
-- Name: faculties_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.faculties_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.faculties_id_seq OWNER TO postgres;

--
-- TOC entry 4924 (class 0 OID 0)
-- Dependencies: 219
-- Name: faculties_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.faculties_id_seq OWNED BY public.faculties.id;


--
-- TOC entry 4761 (class 2604 OID 16449)
-- Name: departments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments ALTER COLUMN id SET DEFAULT nextval('public.departments_id_seq'::regclass);


--
-- TOC entry 4760 (class 2604 OID 16393)
-- Name: faculties id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faculties ALTER COLUMN id SET DEFAULT nextval('public.faculties_id_seq'::regclass);


--
-- TOC entry 4917 (class 0 OID 16446)
-- Dependencies: 222
-- Data for Name: departments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.departments (id, faculty_id, dept_name) FROM stdin;
21	1	Department of Agronomy
22	1	Department of Animal Science
23	2	Department of Architectural Design
24	2	Department of Urban and Spatial Planning
25	3	Department of Electronics, Microelectronics, Computer and Intelligent Systems
26	3	Department of Telecommunications
27	4	Department of Mathematics
28	4	Department of Physics
29	5	Department of Management
30	5	Department of Marketing
31	6	Department of Structural Engineering
32	6	Department of Geotechnical Engineering
33	7	Department of Fundamental Theology
34	7	Department of Pastoral Theology
35	8	Department of Chemical Engineering
36	8	Department of Organic Chemistry
37	9	Department of Journalism
38	9	Department of Political Theory
39	10	Department of Philosophy
40	10	Department of History
\.


--
-- TOC entry 4915 (class 0 OID 16390)
-- Dependencies: 220
-- Data for Name: faculties; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.faculties (id, name, short_name, established_year, website, address_street, address_city, postal_code, university) FROM stdin;
1	Faculty of Agriculture	AGR	1925	https://www.agr.unizg.hr	Svetosimunska 25	Zagreb	10000	Sveuciliste u Zagrebu
2	Faculty of Architecture	ARH	1919	https://www.arhitekt.unizg.hr	Fra Andrije Kacica Miosica 26	Zagreb	10000	Sveuciliste u Zagrebu
3	Faculty of Electrical Engineering and Computing	FER	1956	https://www.fer.unizg.hr	Unska 3	Zagreb	10000	Sveucilište u Zagrebu
4	Faculty of Science	PMF	1946	https://www.pmf.unizg.hr	Horvatovac 102a	Zagreb	10000	Sveucilište u Zagrebu
5	Faculty of Economics and Business	EFZG	1920	https://www.efzg.unizg.hr	Trg J.F. Kennedyja 6	Zagreb	10000	Sveucilište u Zagrebu
6	Faculty of Civil Engineering	GFSB	1919	https://www.grad.unizg.hr	Vukovarska 58	Zagreb	10000	Sveucilište u Zagrebu
7	Catholic Faculty of Theology	KBF	1227	https://www.kbf.unizg.hr	Vlaška 38	Zagreb	10000	Sveucilište u Zagrebu
8	Faculty of Chemical Engineering and Technology	FKIT	1919	https://www.fkit.unizg.hr	Marulicev trg 19	Zagreb	10000	Sveucilište u Zagrebu
9	Faculty of Political Science	FPZG	1962	https://www.fpzg.unizg.hr	Lepusiceva ul. 6	Zagreb	10000	Sveucilište u Zagrebu
10	Faculty of Humanities and Social Sciences	FFZG	1874	https://www.ffzg.unizg.hr	Krvavac 3	Zagreb	10000	Sveucilište u Zagrebu
\.


--
-- TOC entry 4925 (class 0 OID 0)
-- Dependencies: 221
-- Name: departments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.departments_id_seq', 40, true);


--
-- TOC entry 4926 (class 0 OID 0)
-- Dependencies: 219
-- Name: faculties_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.faculties_id_seq', 1, false);


--
-- TOC entry 4765 (class 2606 OID 16455)
-- Name: departments departments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_pkey PRIMARY KEY (id);


--
-- TOC entry 4763 (class 2606 OID 16399)
-- Name: faculties faculties_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faculties
    ADD CONSTRAINT faculties_pkey PRIMARY KEY (id);


--
-- TOC entry 4766 (class 2606 OID 16456)
-- Name: departments departments_faculty_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_faculty_id_fkey FOREIGN KEY (faculty_id) REFERENCES public.faculties(id);


-- Completed on 2025-10-24 17:39:33

--
-- PostgreSQL database dump complete
--

\unrestrict IqXEyt0JTQuxsNEGKedNuWCfNpmd1orhl6zRZXoqTF5p4VSuZnCvZSw4bv94hHx

