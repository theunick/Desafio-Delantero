PGDMP                      |           desafio_delantero    16.0    16.2 !               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            	           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            
           1262    49288    desafio_delantero    DATABASE     �   CREATE DATABASE desafio_delantero WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Italian_Italy.1252';
 !   DROP DATABASE desafio_delantero;
                postgres    false            �            1259    65644    hangman    TABLE     W   CREATE TABLE public.hangman (
    id integer NOT NULL,
    word text,
    hint text
);
    DROP TABLE public.hangman;
       public         heap    postgres    false            �            1259    65643    hangman_id_seq    SEQUENCE     �   CREATE SEQUENCE public.hangman_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.hangman_id_seq;
       public          postgres    false    222                       0    0    hangman_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.hangman_id_seq OWNED BY public.hangman.id;
          public          postgres    false    221            �            1259    49289 	   questions    TABLE     `  CREATE TABLE public.questions (
    id integer NOT NULL,
    diff character varying(10) NOT NULL,
    question text NOT NULL,
    answer character varying(255) NOT NULL,
    option1 character varying(255) NOT NULL,
    option2 character varying(255) NOT NULL,
    option3 character varying(255) NOT NULL,
    option4 character varying(255) NOT NULL
);
    DROP TABLE public.questions;
       public         heap    postgres    false            �            1259    49294    questions_id_seq    SEQUENCE     �   CREATE SEQUENCE public.questions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.questions_id_seq;
       public          postgres    false    215                       0    0    questions_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.questions_id_seq OWNED BY public.questions.id;
          public          postgres    false    216            �            1259    49295    user_scores    TABLE     �   CREATE TABLE public.user_scores (
    id integer NOT NULL,
    uname character varying,
    score integer,
    "timestamp" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.user_scores;
       public         heap    postgres    false            �            1259    49301    user_scores_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_scores_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.user_scores_id_seq;
       public          postgres    false    217                       0    0    user_scores_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.user_scores_id_seq OWNED BY public.user_scores.id;
          public          postgres    false    218            �            1259    49302    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    49307    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    219                       0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    220            c           2604    65647 
   hangman id    DEFAULT     h   ALTER TABLE ONLY public.hangman ALTER COLUMN id SET DEFAULT nextval('public.hangman_id_seq'::regclass);
 9   ALTER TABLE public.hangman ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    221    222            _           2604    49308    questions id    DEFAULT     l   ALTER TABLE ONLY public.questions ALTER COLUMN id SET DEFAULT nextval('public.questions_id_seq'::regclass);
 ;   ALTER TABLE public.questions ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215            `           2604    49309    user_scores id    DEFAULT     p   ALTER TABLE ONLY public.user_scores ALTER COLUMN id SET DEFAULT nextval('public.user_scores_id_seq'::regclass);
 =   ALTER TABLE public.user_scores ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217            b           2604    49310    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219                      0    65644    hangman 
   TABLE DATA           1   COPY public.hangman (id, word, hint) FROM stdin;
    public          postgres    false    222   �"       �          0    49289 	   questions 
   TABLE DATA           c   COPY public.questions (id, diff, question, answer, option1, option2, option3, option4) FROM stdin;
    public          postgres    false    215   p&       �          0    49295    user_scores 
   TABLE DATA           D   COPY public.user_scores (id, uname, score, "timestamp") FROM stdin;
    public          postgres    false    217   �-                 0    49302    users 
   TABLE DATA           :   COPY public.users (id, name, email, password) FROM stdin;
    public          postgres    false    219   L.                  0    0    hangman_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.hangman_id_seq', 50, true);
          public          postgres    false    221                       0    0    questions_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.questions_id_seq', 43, true);
          public          postgres    false    216                       0    0    user_scores_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.user_scores_id_seq', 10, true);
          public          postgres    false    218                       0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 27, true);
          public          postgres    false    220            m           2606    65651    hangman hangman_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.hangman
    ADD CONSTRAINT hangman_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.hangman DROP CONSTRAINT hangman_pkey;
       public            postgres    false    222            e           2606    49312    questions questions_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.questions DROP CONSTRAINT questions_pkey;
       public            postgres    false    215            g           2606    49314    user_scores user_scores_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.user_scores
    ADD CONSTRAINT user_scores_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.user_scores DROP CONSTRAINT user_scores_pkey;
       public            postgres    false    217            i           2606    49316    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    219            k           2606    49318    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    219               �  x�mT�n�6<�_����1~'�x����\�RKn�#*$5��k�9�3�e#�y����U�/���G���e�d&϶6��;	�a1;�S�1/�G2_�2����F	ޢ���#T8��~�<��<9-Avcv2���!e�I�z�Hǲ��ܓ�abs7� �����[�曌�6��$ςxדG��=i��47�]��8�dqRb]p� a&`�+��QC�밟9�J�ب���{���t�w���\�#�@���ЉvϨ�:}-�j�Y�I�1�IUc�9S�єщcG�=�٭��GA#4Xz�^|�ژ��(Da!�4� �X���H�I�(��$����.�C���.a<�BR/�.ҁc"�	5\Zf����W�d�aQi�D���^Cm}f�0Y�� ��^A���bFq���}�4zN ñ�Q��dr|�Q�`|�]�yyYP�@?������y\w2� ����_l�SV�ٺ5�-1��^ �c��86�n�����������>���TNG�.Q��V{�U�{4%�)�`�$%�֗�;E0�sp۔TeSv�x �!��#lr� �t%qd�3��~ޫ��̍�͂I-R�<�Ըehp���Xi�i̎`(T"4���ǛiZY׃O偧g'�ˡ4�j�J%2)e��lT�3ț�Y�����L���B�K�N���@ա(;
Z_�7�e���F^Ǳ��� ���:������[i��f��Q�6�.���?DdƟ@�6�W����J��d��	����D�m7�n��wO�r��]u�P)��;��H�������揵c��������2ѫ?��j�p�ˣ�t�R��qױJHw�^����Y��T��~WD�9ӵ�������`p�������Xk��mX`      �     x��XMs�6=���KN툤�H'�,Ǯ�U�4����&a

`@R3�io���^�?��C�H9v�C���ݷ�]�s8e���
J8�>ibkb[!s�R����"�y.f��b�e^dεHH:�2�ڹUj��~�ޥd�쒡����Y,TH,�f��'�vEB��%�ʹ�T%���^i!��k.ւ=�ɤB`��p&v�,R%��Y����B1�S"���9�$C����WH�Y�J��$R����e$#��V[
����R���\Ur�Qp���E��)C2^sF	v]�!�I���|g%��o6�
��㡽K@��ݪ, ZU;�keAwO���Z����"|&lb+,��|��#Ǜ�O�w����� W�}�>gLb���l��@�t����jf ]�9�\ǴQ��]�U��~�6��x��`�J�j�A���
v&��?�3犇!�>O5�(4��@\r���ˣz\�EiBFA�M_)�z�PI�Um��1(DY&6��ͱd�!�%��B�ï,Hc�9
�آ]�}�JM\��z�0���n,4���`�h�.	��j�\`���`�����_�z��!&�^p�` L�EKx�X1Tȗg��UYKpm^��ؑJo���^���E�~D TCWYn�T�U3S#o:E�.��1g�pZw��t���N����r$�z�eL�I��2�+Sk�ns�n6OKi��I�K#X��E�|m<�B�`���mEې�">����|L\�u;��@���%�C�#�"�A����%�S�-mA"�+I>�8n:�w�}������iխ�Խ�p�X5㱱k�*�su�7����X�-"3କ���0�r<����R֡K� ��r-R؅}hi�U��_�Zڬ���~շ"�;P	a����Py�7X�]��\!�Q�b���m-<���A��*�@�1eIcGM�|�#OS�LKT����[i�k�]�_�ZE%���bVI^�VV��TSl2�����M�G��.�Ũ�F$�w��4|�Bf�"F[n�tW�bm����-yŋk%2��qTa���3%%�bŝ�K1�3�k�1���`�ꢩZ�A5�ڏ ����'�f�M�?�S
^)��=�wN@��GL�ܐ����jͷ�ˏ���k��s��R5��%���a�7js�l[�S���Z�1+C;)S��W"�B�K��_.
Svߦu���5��j4~&��p�?����B��j��@��9M�u:�:k�Q��I���ݿ�ʣ:�T��
0�JYCFI��`�����Fe`/�� �{.��o��2L��:2��]�l O��z=3��a�j�Jf��hB�\-��*��+Nq�[�k*�7��W�:s��
�VbY�^�ds�dT��4����,�}���Hc"�xH�@Х}��3�c������<Îv�E����s�	, �Φ�`܁����EU��k��͠�]��������Rʍ��s�3͛R��z'���?���S�h�ؚ��+n-T��ez�5]��j�Dr��aE}���B��On�z�/�Qw���w������Zr]Ă������L�Nk\����LlUE�i>��jRC�n)�T�KD����E�D�Ȏ����;����t]���v��[�
�2N��7$�~���p�߽�_h��J��j�y#ۓȸ��ީ���&=ɌJ�Ivd
�� �s�h�`j��W{5r�ޞ�iBؕ���|3t{l��i�!�a��-��܎�!�C�j���N�c���X�S��lߌ��O���S�>4>d�x���P�_;��ϫ��o߻��E^��      �   �   x�u�;NQ���z�@,����D)�HѤ��3�����sx���9t�]ɯ$����Y&���2�mh�O/R��=?o���<9=ZӒ�����x��1z!n��B�5�e�d���R���HS�qە!��h{�RFL�e�d�Z˩��ז�I+!+��2�j�Z����o _�}K�         �   x�e�M�0 @��wx�6Ew̖2�2J$��̚�3�t���k�x��C���z�}/��g��])Z�Tg�H��L����51}�.��={�x��e:�u�X���J|��1�o􂩟���\:�>��dp���`��Y��"���0&�^�cn-Z�wp� �7&R90     