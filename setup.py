from setuptools import setup

setup(
    name='sist_dist_mod1',
    packages=['sist_dist_mod1'],
    include_package_data=True,
    install_requires=[
        'flask',
        'flask_socketio'
    ],

)