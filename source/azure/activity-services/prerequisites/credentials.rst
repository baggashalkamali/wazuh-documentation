.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn what you need to provide access credentials to the Wazuh Azure module so it can successfully connect to Azure in this section of the Wazuh documentation.

Configuring Azure credentials
=============================

It is necessary to provide access credentials to the Wazuh Azure module so it can successfully connect to Azure. The credentials required vary depending on the type of monitoring.


.. _graph_and_log_analytics_credentials:

Getting access credentials for Microsoft Graph and Log Analytics
----------------------------------------------------------------
For :doc:`Microsoft Graph </azure/activity-services/active-directory/graph>` and :doc:`Log Analytics </azure/activity-services/services/log-analytics>` valid ``application_id`` and ``application_key`` values are required. The necessary ``application_key`` value for a given **App Registration** in **Azure Active Directory** can be obtained from the **Certificates & secrets** section while the ``application_id`` can be obtained from the **Overview** section:

.. thumbnail:: /images/azure/log-analytics-create-key.png
    :title: Log Analytics App
    :align: center
    :width: 100%

.. thumbnail:: /images/azure/log-analytics-key-created.png
    :title: Log Analytics App
    :align: center
    :width: 100%


Getting access credentials for Storage
--------------------------------------
:doc:`Azure Storage </azure/activity-services/services/storage>` requires valid ``account_name`` and ``account_key`` values. They can be obtained in the **Access keys** section of **Storage accounts**:

.. thumbnail:: ../../../images/azure/account-credentials.png
    :title: Storage
    :align: center
    :width: 100%


Authentication options
----------------------

There are two different ways to set up the Azure authentication:

Using an authentication file
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

It is possible to store the credentials in a file for authentication as long as the file content follows the `field = value` format explained below.

The fields expected to be present in the credentials file will change depending on the type of service or activity to be monitored.

.. rubric:: Microsoft Graph and Log Analytics
   :class: h5

The file must contain only two lines, one for the application ID and another one for the application key obtained previously.

.. code-block:: none

   application_id = <YOUR_APPLICATION_ID>
   application_key = <YOUR_APPLICATION_KEY>

.. rubric:: Storage
   :class: h5

The file must contain only two lines, one for the account name and the other one for the account key obtained previously:

.. code-block:: none

   account_name = <YOUR_ACCOUNT_NAME>
   account_key = <YOUR_ACCOUNT_KEY>


Regardless of the service or activity to be monitored, the authentication file is always specified in the ``ossec.conf`` configuration file using the ``<auth_path>`` tag. Take a look at the following example:

.. code-block:: none
   :emphasize-lines: 6, 17, 27

   <wodle name="azure-logs">
     <disabled>no</disabled>
     <run_on_start>yes</run_on_start>

     <log_analytics>
         <auth_path>/var/ossec/wodles/credentials/log_analytics_credentials</auth_path>

         <tenantdomain>wazuh.onmicrosoft.com</tenantdomain>
         <request>
             <query>AzureActivity</query>
             <workspace>d6b...efa</workspace>
             <time_offset>1d</time_offset>
         </request>
     </log_analytics>

     <graph>
         <auth_path>/var/ossec/wodles/credentials/graph_credentials</auth_path>

         <tenantdomain>wazuh.onmicrosoft.com</tenantdomain>
         <request>
             <query>auditLogs/directoryAudits</query>
             <time_offset>1d</time_offset>
         </request>
     </graph>

     <storage>
         <auth_path>/var/ossec/wodles/credentials/storage_credentials</auth_path>

         <container name="insights-operational-logs">
             <blobs>.json</blobs>
             <content_type>json_inline</content_type>
             <time_offset>24h</time_offset>
         </container>
     </storage>
   </wodle>


Check the :doc:`azure-logs wodle </user-manual/reference/ossec-conf/wodle-azure-logs>` section from the ossec.conf reference page for more information about the ``<auth_path>`` and other available parameters.


Inserting the credentials into the configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. deprecated:: 4.4.0

Another authentication option is to set up credentials by storing them directly into the Wazuh configuration file ``/var/ossec/etc/ossec.conf``, inside of the ``<graph>``, ``<log_analytics>`` and ``<storage>`` blocks on the module configuration.

The tags to use are different depending on the type of service or activity to be monitored:

.. rubric:: Microsoft Graph and Log Analytics
   :class: h5

.. code-block:: none
   :emphasize-lines: 6, 7, 18, 19

   <wodle name="azure-logs">
     <disabled>no</disabled>
     <run_on_start>yes</run_on_start>

     <log_analytics>
         <application_id>8b7...c14</application_id>
         <application_key>w22...91x</application_key>

         <tenantdomain>wazuh.onmicrosoft.com</tenantdomain>
         <request>
             <query>AzureActivity</query>
             <workspace>d6b...efa</workspace>
             <time_offset>1d</time_offset>
         </request>
     </log_analytics>

     <graph>
         <application_id>8b7...c14</application_id>
         <application_key>w22...91x</application_key>

         <tenantdomain>wazuh.onmicrosoft.com</tenantdomain>
         <request>
             <query>auditLogs/directoryAudits</query>
             <time_offset>1d</time_offset>
         </request>
     </graph>
   </wodle>

.. rubric:: Storage
   :class: h5

.. code-block:: none
   :emphasize-lines: 6, 7

   <wodle name="azure-logs">
     <disabled>no</disabled>
     <run_on_start>yes</run_on_start>

     <storage>
         <account_name>exampleaccountname</account_name>
         <account_key>w22...91x</account_key>

         <container name="insights-operational-logs">
             <blobs>.json</blobs>
             <content_type>json_inline</content_type>
             <time_offset>24h</time_offset>
         </container>
     </storage>
   </wodle>

Take a look at the :doc:`azure-logs wodle </user-manual/reference/ossec-conf/wodle-azure-logs>` entry from the ``ossec.conf`` reference page for more information about the parameters.
