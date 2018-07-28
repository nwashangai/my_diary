--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.13
-- Dumped by pg_dump version 9.5.13

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: diary; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.diary (
    id integer NOT NULL,
    userid integer NOT NULL,
    subject character varying(200) NOT NULL,
    diary text NOT NULL,
    date timestamp without time zone DEFAULT now()
);


ALTER TABLE public.diary OWNER TO postgres;

--
-- Name: diary_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.diary_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.diary_id_seq OWNER TO postgres;

--
-- Name: diary_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.diary_id_seq OWNED BY public.diary.id;


--
-- Name: reminder; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reminder (
    id integer NOT NULL,
    userid integer NOT NULL,
    description text NOT NULL,
    date timestamp without time zone NOT NULL
);


ALTER TABLE public.reminder OWNER TO postgres;

--
-- Name: reminder_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reminder_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reminder_id_seq OWNER TO postgres;

--
-- Name: reminder_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reminder_id_seq OWNED BY public.reminder.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    full_name character varying(80) NOT NULL,
    email character varying(80) NOT NULL,
    tot_entries integer DEFAULT 0,
    bio text,
    password text NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.diary ALTER COLUMN id SET DEFAULT nextval('public.diary_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reminder ALTER COLUMN id SET DEFAULT nextval('public.reminder_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: diary; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.diary (id, userid, subject, diary, date) FROM stdin;
2	41	foo	bar	2018-07-27 14:15:28.776816
3	41	foo	bar	2018-07-27 14:26:43.528182
4	41	foo	bar	2018-07-27 14:32:53.90946
5	41	foo	bar	2018-07-27 14:36:47.250755
6	41	foo	bar	2018-07-27 15:11:22.203747
7	41	foo	bar	2018-07-27 15:46:59.123682
8	41	foo	bar	2018-07-27 18:15:17.989179
9	41	foo	bar	2018-07-27 18:19:23.228488
10	41	foo	bar	2018-07-27 18:22:57.598035
11	41	foo	bar	2018-07-27 18:46:49.428923
12	41	foo	bar	2018-07-27 18:48:32.984725
1	41	foo update	bar update	2018-07-27 13:00:16.613296
\.


--
-- Name: diary_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.diary_id_seq', 12, true);


--
-- Data for Name: reminder; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reminder (id, userid, description, date) FROM stdin;
\.


--
-- Name: reminder_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reminder_id_seq', 1, false);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, full_name, email, tot_entries, bio, password) FROM stdin;
41	nwashangai	young@gmail.com	0	\N	sha1$ec12cdbd$1$9471f05601687866e2d16ad7e176267b0264dfed
42	femi	femi@gmail.com	0	\N	sha1$1b8042f5$1$d1f5df87f8d453dab3433bd10fa989944b35d527
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 42, true);


--
-- Name: diary_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.diary
    ADD CONSTRAINT diary_pkey PRIMARY KEY (id);


--
-- Name: reminder_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reminder
    ADD CONSTRAINT reminder_pkey PRIMARY KEY (id);


--
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

